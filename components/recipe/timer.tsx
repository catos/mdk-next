import * as React from "react"
// import { RefreshIcon } from "@heroicons/react/outline"
import clsx from "clsx"

// https://github.com/LobsterBandit/use-countdown-timer/blob/master/src/index.ts
// https://reactjsexample.com/react-hook-exposing-a-countdown-timer-with-optional-expiration-and-reset-callbacks/
interface ITimerState {
  remaining: number
  clock: string
  isRunning: boolean
  canStart: boolean
}

type ActionType =
  | { type: "start" }
  | { type: "started" }
  | { type: "reset"; data: ITimerState }
  | { type: "pause" }
  | { type: "tick" }

const initialState: ITimerState = {
  remaining: 0,
  clock: "00:00",
  isRunning: false,
  canStart: false,
}

// TODO: fix isRunning
const reducer: React.Reducer<ITimerState, ActionType> = (state, action) => {
  switch (action.type) {
    case "start":
      return { ...state, canStart: true }
    case "started":
      return { ...state, isRunning: true }
    case "reset":
      return {
        ...action.data,
        clock: msToClock(action.data.remaining),
      }
    case "pause":
      return { ...state, isRunning: false, canStart: false }
    case "tick":
      const _remaining = state.remaining - 1000
      return {
        ...state,
        remaining: _remaining,
        clock: msToClock(_remaining),
      }
    default:
      return state
  }
}

function msToClock(ms: number) {
  const totalSeconds = ms / 1000

  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")

  return `${minutes}:${seconds}`
}

const useTimer = (minutes: number, onExpire?: () => void) => {
  const ms = minutes * 1000 * 60
  const remainingRef = React.useRef<number>(ms)
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    remaining: ms,
    clock: msToClock(ms),
  })
  const { remaining, canStart } = state

  React.useEffect(() => {
    remainingRef.current = remaining
  }, [remaining])

  const start = () => {
    dispatch({ type: "start" })
  }

  const reset = () => {
    dispatch({ type: "reset", data: { ...initialState, remaining: ms } })
  }

  const pause = React.useCallback(() => {
    dispatch({ type: "pause" })
  }, [])

  const expire = React.useCallback(() => {
    if (onExpire && typeof onExpire === "function") {
      onExpire()
    }
    pause()
  }, [onExpire, pause])

  React.useEffect(() => {
    function tick() {
      if (remainingRef.current <= 0) {
        expire()
      } else {
        dispatch({ type: "tick" })
      }
    }

    let id: NodeJS.Timeout
    if (canStart) {
      id = setInterval(tick, 1000)
      dispatch({ type: "started" })
    }

    return () => clearInterval(id)
  }, [canStart, expire])

  return {
    ...state,
    start,
    reset,
    pause,
  }
}

interface ITimerProps {
  value: number
}

// TODO: refactor styles
// TODO: accept hours, minutes, seconds maybe ?
const Timer: React.FC<ITimerProps> = ({ value }) => {
  const { remaining, clock, isRunning, start, reset, pause } = useTimer(value)
  const [progress, setProgress] = React.useState(10)

  React.useEffect(() => {
    setProgress(Math.round((remaining / (value * 1000 * 60)) * 100))
  }, [remaining, value])

  return (
    <div className="flex gap-2">
      <div
        className="flex-grow relative cursor-pointer h-8 rounded"
        onClick={isRunning ? pause : start}
      >
        <LinearProgress
          // color={isRunning ? "secondary" : undefined}
          isRunning
          // variant="determinate"
          value={progress}
          // style={{ height: "2rem", width: "100%" }}
        />
        <span className="absolute top-0 right-0 bottom-0 left-0 flex flex-grow justify-center items-center text-white text-xl">
          {clock}
        </span>
      </div>
      <button
        className="bg-slate-200 flex items-center justify-center rounded px-2 "
        onClick={() => reset()}
      >
        {/* <RefreshIcon className="w-4 h-4" /> */}
        R
      </button>
    </div>
  )
}

export default Timer

interface LinearProgressProps {
  isRunning: boolean
  value: number
}

const LinearProgress: React.FC<LinearProgressProps> = ({
  isRunning,
  value,
}) => {
  return (
    <div
      className={clsx(
        "h-8 rounded w-full",
        isRunning ? "bg-slate-200" : "bg-slate-200"
      )}
    >
      <div
        className={clsx(
          "h-full rounded transition-all duration-200 ease-linear",
          isRunning ? "bg-slate-500" : "bg-slate-500"
        )}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  )
}
