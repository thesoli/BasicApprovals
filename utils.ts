import { ICompanyManagmentMemberOffline, ICompanyManagmentMemberOfflineForm } from "./types";

export function inParser(data: ICompanyManagmentMemberOffline): ICompanyManagmentMemberOfflineForm {
  return {
    ...(data as any),
  };
}

export function outParser(data: ICompanyManagmentMemberOfflineForm): ICompanyManagmentMemberOffline {
  return {
    ...(data as any)
  };
}
