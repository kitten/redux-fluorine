export const RECOVER_AFTER_ERROR = '@@redux-fluorine/RECOVER_AFTER_ERROR'

export default function filterActions(anchor, actions) {
  return {
    type: RECOVER_AFTER_ERROR,
    anchor,
    actions
  }
}

