import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ExternalLink,
  GitPullRequest,
  FileText,
  Plus,
  Minus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { PullRequest } from '@/hooks/useGitHubPullRequests';
import { cn } from '@/lib/utils';

interface PRCardProps {
  pr: PullRequest;
  priority: 'high' | 'medium' | 'low' | null;
  onPriorityChange: (priority: 'high' | 'medium' | 'low' | null) => void;
}

const reviewStatusConfig: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
  approved: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Approved',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-300 dark:border-green-700',
  },
  changes_requested: {
    icon: <XCircle className="h-4 w-4" />,
    label: 'Changes Requested',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-300 dark:border-red-700',
  },
  reviewed: {
    icon: <AlertCircle className="h-4 w-4" />,
    label: 'In Review',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
  },
  pending: {
    icon: <Clock className="h-4 w-4" />,
    label: 'Pending Review',
    className: 'bg-muted text-muted-foreground border-border',
  },
  unknown: {
    icon: <Clock className="h-4 w-4" />,
    label: 'Unknown',
    className: 'bg-muted text-muted-foreground border-border',
  },
};

const priorityConfig = {
  high: {
    label: 'High Priority',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    icon: <ArrowUp className="h-3 w-3" />,
  },
  medium: {
    label: 'Medium Priority',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    icon: <Star className="h-3 w-3" />,
  },
  low: {
    label: 'Low Priority',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: <ArrowDown className="h-3 w-3" />,
  },
};

export default function PRCard({ pr, priority, onPriorityChange }: PRCardProps) {
  const reviewConfig = reviewStatusConfig[pr.review_status] || reviewStatusConfig.unknown;
  
  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      priority === 'high' && "ring-2 ring-red-500/50",
      priority === 'medium' && "ring-2 ring-yellow-500/50"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* PR Icon and Number */}
          <div className="flex flex-col items-center">
            <GitPullRequest className={cn(
              "h-5 w-5",
              pr.draft ? "text-muted-foreground" : "text-green-600 dark:text-green-400"
            )} />
            <span className="text-xs text-muted-foreground mt-1">#{pr.number}</span>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Title Row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <a
                  href={pr.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                >
                  {pr.title}
                </a>
                
                {/* Branch Info */}
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-mono bg-muted px-1 py-0.5 rounded">{pr.head.ref}</span>
                  <span className="mx-1">→</span>
                  <span className="font-mono bg-muted px-1 py-0.5 rounded">{pr.base.ref}</span>
                </div>
              </div>
              
              <Button variant="ghost" size="icon" asChild className="flex-shrink-0">
                <a href={pr.html_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            {/* Meta Row */}
            <div className="flex items-center gap-4 mt-3 text-sm">
              {/* Author */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={pr.user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:opacity-80"
                    >
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={pr.user.avatar_url} alt={pr.user.login} />
                        <AvatarFallback>{pr.user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">{pr.user.login}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Author: {pr.user.login}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Files Changed */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{pr.files_changed}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>{pr.files_changed} files changed</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Additions/Deletions */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5 text-green-600 dark:text-green-400">
                  <Plus className="h-3 w-3" />
                  {pr.additions}
                </span>
                <span className="flex items-center gap-0.5 text-red-600 dark:text-red-400">
                  <Minus className="h-3 w-3" />
                  {pr.deletions}
                </span>
              </div>
              
              {/* Time */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{formatDistanceToNow(new Date(pr.created_at), { addSuffix: true })}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Created: {new Date(pr.created_at).toLocaleString()}
                    <br />
                    Updated: {new Date(pr.updated_at).toLocaleString()}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Labels and Status Row */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {/* Draft Badge */}
              {pr.draft && (
                <Badge variant="secondary" className="text-xs">
                  Draft
                </Badge>
              )}
              
              {/* Review Status */}
              <Badge className={cn("flex items-center gap-1 text-xs border", reviewConfig.className)}>
                {reviewConfig.icon}
                {reviewConfig.label}
              </Badge>
              
              {/* Priority Badge */}
              {priority && (
                <Badge className={cn("flex items-center gap-1 text-xs", priorityConfig[priority].className)}>
                  {priorityConfig[priority].icon}
                  {priorityConfig[priority].label}
                </Badge>
              )}
              
              {/* GitHub Labels */}
              {pr.labels.map((label) => (
                <Badge
                  key={label.name}
                  variant="outline"
                  className="text-xs"
                  style={{
                    backgroundColor: `#${label.color}20`,
                    borderColor: `#${label.color}`,
                    color: `#${label.color}`,
                  }}
                >
                  {label.name}
                </Badge>
              ))}
              
              {/* Requested Reviewers */}
              {pr.requested_reviewers && pr.requested_reviewers.length > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">Reviewers:</span>
                  {pr.requested_reviewers.map((reviewer) => (
                    <TooltipProvider key={reviewer.login}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={reviewer.avatar_url} alt={reviewer.login} />
                            <AvatarFallback>{reviewer.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>{reviewer.login}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Priority Actions */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t">
          <span className="text-xs text-muted-foreground">Set Priority:</span>
          <div className="flex gap-1">
            <Button
              variant={priority === 'high' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "h-7 text-xs",
                priority === 'high' && "bg-red-600 hover:bg-red-700"
              )}
              onClick={() => onPriorityChange(priority === 'high' ? null : 'high')}
            >
              <ArrowUp className="h-3 w-3 mr-1" />
              High
            </Button>
            <Button
              variant={priority === 'medium' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "h-7 text-xs",
                priority === 'medium' && "bg-yellow-600 hover:bg-yellow-700"
              )}
              onClick={() => onPriorityChange(priority === 'medium' ? null : 'medium')}
            >
              <Star className="h-3 w-3 mr-1" />
              Medium
            </Button>
            <Button
              variant={priority === 'low' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "h-7 text-xs",
                priority === 'low' && "bg-blue-600 hover:bg-blue-700"
              )}
              onClick={() => onPriorityChange(priority === 'low' ? null : 'low')}
            >
              <ArrowDown className="h-3 w-3 mr-1" />
              Low
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
