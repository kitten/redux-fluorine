import symbolObservable from 'symbol-observable'

export default function isObservable(obj) {
  return (
    obj &&
    obj[symbolObservable] === 'function'
  )
}

