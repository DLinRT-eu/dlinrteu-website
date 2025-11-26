import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { ReviewRound } from "@/utils/reviewRoundUtils";
import { format, isSameDay, parseISO } from "date-fns";

interface ReviewRoundsCalendarProps {
  rounds: ReviewRound[];
}

interface CalendarEvent {
  date: Date;
  rounds: Array<{
    id: string;
    name: string;
    status: string;
    eventType: 'start' | 'end' | 'deadline';
  }>;
}

export function ReviewRoundsCalendar({ rounds }: ReviewRoundsCalendarProps) {
  const navigate = useNavigate();
  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Build calendar events map
  const calendarEvents = new Map<string, CalendarEvent>();

  rounds.forEach(round => {
    // Start date event
    const startDate = parseISO(round.start_date);
    const startKey = format(startDate, 'yyyy-MM-dd');
    if (!calendarEvents.has(startKey)) {
      calendarEvents.set(startKey, { date: startDate, rounds: [] });
    }
    calendarEvents.get(startKey)!.rounds.push({
      id: round.id,
      name: round.name,
      status: round.status,
      eventType: 'start'
    });

    // End date event
    if (round.end_date) {
      const endDate = parseISO(round.end_date);
      const endKey = format(endDate, 'yyyy-MM-dd');
      if (!calendarEvents.has(endKey)) {
        calendarEvents.set(endKey, { date: endDate, rounds: [] });
      }
      calendarEvents.get(endKey)!.rounds.push({
        id: round.id,
        name: round.name,
        status: round.status,
        eventType: 'end'
      });
    }

    // Deadline event
    if (round.default_deadline) {
      const deadlineDate = parseISO(round.default_deadline);
      const deadlineKey = format(deadlineDate, 'yyyy-MM-dd');
      if (!calendarEvents.has(deadlineKey)) {
        calendarEvents.set(deadlineKey, { date: deadlineDate, rounds: [] });
      }
      calendarEvents.get(deadlineKey)!.rounds.push({
        id: round.id,
        name: round.name,
        status: round.status,
        eventType: 'deadline'
      });
    }
  });

  // Get events for selected date
  const selectedDateEvents = selectedDate
    ? calendarEvents.get(format(selectedDate, 'yyyy-MM-dd'))
    : null;

  // Custom day renderer to show event indicators
  const modifiers = {
    hasEvents: Array.from(calendarEvents.values()).map(e => e.date)
  };

  const modifiersStyles = {
    hasEvents: {
      fontWeight: 'bold',
      position: 'relative' as const
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      case 'completed': return 'bg-green-500 text-white';
      case 'archived': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted';
    }
  };

  const getEventTypeIcon = (type: 'start' | 'end' | 'deadline') => {
    switch (type) {
      case 'start': return '▶';
      case 'end': return '■';
      case 'deadline': return '⚑';
    }
  };

  return (
    <div className="grid md:grid-cols-[1fr,400px] gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle>Review Rounds Timeline</CardTitle>
          <CardDescription>
            Click on a date to see round events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={month}
              onMonthChange={setMonth}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
              components={{
                Day: ({ date, ...props }) => {
                  const dateKey = format(date, 'yyyy-MM-dd');
                  const events = calendarEvents.get(dateKey);
                  const hasEvents = events && events.rounds.length > 0;

                  return (
                    <div className="relative">
                      <button
                        {...props}
                        className={`
                          h-9 w-9 p-0 font-normal
                          ${hasEvents ? 'font-bold' : ''}
                          ${selectedDate && isSameDay(date, selectedDate) ? 'bg-primary text-primary-foreground' : ''}
                        `}
                      >
                        {format(date, 'd')}
                        {hasEvents && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
                            {events.rounds.slice(0, 3).map((_, i) => (
                              <div
                                key={i}
                                className="h-1 w-1 rounded-full bg-primary"
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    </div>
                  );
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Events sidebar */}
      <div className="space-y-4">
        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span>▶</span>
              <span className="text-muted-foreground">Round Start</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>■</span>
              <span className="text-muted-foreground">Round End</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>⚑</span>
              <span className="text-muted-foreground">Deadline</span>
            </div>
            <div className="pt-2 border-t space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Draft</Badge>
                <Badge className="bg-primary">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Completed</Badge>
                <Badge variant="outline">Archived</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected date events */}
        {selectedDate && selectedDateEvents ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {format(selectedDate, 'MMMM d, yyyy')}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.rounds.length} event(s)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedDateEvents.rounds.map((round, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => navigate(`/admin/review-rounds/${round.id}`)}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">
                      {getEventTypeIcon(round.eventType)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {round.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getStatusColor(round.status)} text-xs`}>
                          {round.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {round.eventType === 'start' && 'Starts'}
                          {round.eventType === 'end' && 'Ends'}
                          {round.eventType === 'deadline' && 'Deadline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Select a date to view events
              </p>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Rounds:</span>
              <span className="font-medium">{rounds.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active:</span>
              <span className="font-medium">
                {rounds.filter(r => r.status === 'active').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Completed:</span>
              <span className="font-medium">
                {rounds.filter(r => r.status === 'completed').length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
