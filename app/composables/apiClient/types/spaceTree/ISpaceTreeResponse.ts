import type { ISpaceFolder } from "~/composables/apiClient/types/spaceTree/ISpaceFolder";
import type { ISpaceList } from "~/composables/apiClient/types/spaceTree/ISpaceList";

export interface ISpaceTreeResponse {
  success: boolean,
  data: Array<ISpaceFolder | ISpaceList>
}
