import type { ITaskStatus } from "~/composables/apiClient/types/Task/ITaskStatus";
import type { ITaskCreator } from "~/composables/apiClient/types/Task/ITaskCreator";
import type { ITaskAssignee } from "~/composables/apiClient/types/Task/ITaskAssignee";
import type { ITaskWatcher } from "~/composables/apiClient/types/Task/ITaskWatcher";
import type { ITaskTag } from "~/composables/apiClient/types/Task/ITaskTag";
import type { ITaskPriority } from "~/composables/apiClient/types/Task/ITaskPriority";
import type { TTaskCustomField } from "~/composables/apiClient/types/Task/ITaskCustomField/TTaskCustomField";

export interface ITask {
  "id": string,
  "custom_id": string,
  "custom_item_id": number,
  "name": string,
  "text_content": string,
  "description": string
  "status": ITaskStatus,
  "orderindex": string,
  "date_created": string,
  "date_updated": string,
  "date_closed": string,
  "date_done": string,
  "archived": boolean,
  "creator": ITaskCreator,
  "assignees": ITaskAssignee[],
  "group_assignees": [],
  "watchers": ITaskWatcher[],
  "checklists": [],
  "tags": ITaskTag[],
  "parent": null,
  "top_level_parent": null,
  "priority": ITaskPriority,
  "due_date": string,
  "start_date": string,
  "points": number,
  "time_estimate": null,
  "custom_fields": TTaskCustomField[],
  "dependencies": [],
  "linked_tasks": [],
  "locations": [],
  "team_id": string,
  "url": string,
  "sharing": {
    "public": boolean,
    "public_share_expires_on": string,
    "public_fields": string[],
    "token": string,
    "seo_optimized": boolean
  },
  "permission_level": string,
  "list": {
    "id": string,
    "name": string,
    "access": boolean
  },
  "project": {
    "id": string,
    "name": string,
    "hidden": boolean,
    "access": boolean
  },
  "folder": {
    "id": string,
    "name": string,
    "hidden": boolean,
    "access": boolean
  },
  "space": {
    "id": string
  }
}
