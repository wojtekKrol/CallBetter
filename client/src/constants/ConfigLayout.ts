import RouteTypes from './routes';

export enum ForSessionState {
  NO_AUTH = -1,
  AUTH = 0,
  ALL,
}

type SessionStateElement =
  | ForSessionState.NO_AUTH
  | ForSessionState.AUTH
  | ForSessionState.ALL;

interface LayoutBaseItem {
  label: string;
  showFor: ForSessionState;
  ws?: boolean;
}

export interface LayoutRouteItem extends LayoutBaseItem {
  route: RouteTypes;
}

export type LayoutItem = LayoutRouteItem;

const handleShowFor = (
  arr: Array<LayoutItem>,
  showForArray: SessionStateElement[],
) =>
  arr.filter(({ showFor }) =>
    showForArray.some((val: SessionStateElement) => val === showFor),
  );

function getForAuth(arr: Array<LayoutItem>) {
  const { AUTH, ALL } = ForSessionState;
  const showForArray = [AUTH, ALL];

  return handleShowFor(arr, showForArray);
}

function getForNoAuth(arr: Array<LayoutItem>) {
  const { NO_AUTH, ALL } = ForSessionState;
  const showForArray = [NO_AUTH, ALL];

  return handleShowFor(arr, showForArray);
}

const mainNavConfig: Array<LayoutItem> = [
  {
    label: 'Log in',
    route: RouteTypes.LOG_IN,
    showFor: ForSessionState.NO_AUTH,
    ws: true,
  },
  {
    label: 'Log out',
    route: RouteTypes.INDEX,
    showFor: ForSessionState.AUTH,
  },
];

export const mainNavConfigUser = getForAuth(mainNavConfig);
export const mainNavConfigAnonymous = getForNoAuth(mainNavConfig);
