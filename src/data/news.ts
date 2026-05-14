
import { NewsItem } from "@/types/news";
import { projectLaunch } from "./news/project-launch";
import { websiteV011Release } from "./news/website-v0-11-release";
import { communicationFeaturesLaunch } from "./news/communication-features-launch";
import { fdaAiListUpdateJanuary2025 } from "./news/fda-ai-list-update-january-2025";
import { websiteLaunchWebinar } from "./news/website-launch-webinar";
import { webinarSuccessReviewersCall } from "./news/webinar-success-reviewers-call";
import { december2025PlatformUpdate } from "./news/december-2025-platform-update";
import { companyCertificationLaunch } from "./news/company-certification-launch";
import { estro2026Announcements } from "./news/estro-2026-announcements";

export const NEWS_ITEMS: NewsItem[] = [
  estro2026Announcements,
  companyCertificationLaunch,
  december2025PlatformUpdate,
  webinarSuccessReviewersCall,
  websiteLaunchWebinar,
  fdaAiListUpdateJanuary2025,
  communicationFeaturesLaunch,
  websiteV011Release,
  projectLaunch
];
