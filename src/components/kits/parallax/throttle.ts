// throttle.ts
export default function throttle<T extends object>(
  fn: (this: T, ...args: any[]) => void,
  delay: number
): (this: T, ...args: any[]) => void {
  let timer: NodeJS.Timeout | null = null;
  let lastExecutionTime = 0;

  return function(this: T, ...args: any[]): void {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutionTime;

    if (!timer && timeSinceLastExecution >= delay) {
      fn.apply(this, args);
      lastExecutionTime = now;
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastExecutionTime = Date.now();
        timer = null;
      }, delay - timeSinceLastExecution);
    }
  };
}
