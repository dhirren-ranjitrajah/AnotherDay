export function parseDuration(s: string) {
  let sum = 0;
  let matched = false;

  s.trim()
    .replaceAll(" ", "")
    .split(/(?<=[mhd])/)
    .forEach((part) => {
      const unit = part.slice(-1);
      const value = parseInt(part.slice(0, -1));
      if (isNaN(value)) return null;
      matched = true;
      switch (unit) {
        case "m":
          sum += value;
          break;
        case "h":
          sum += value * 60;
          break;
        case "d":
          sum += value * 60 * 8; // 8h workday
          break;
        default:
          matched = false;
          return null;
      }
    });

  return matched ? sum : NaN;
}

export function durationAsString(n: number) {
  const h = 60;
  const d = h * 8;

  const days = Math.floor(n / d);
  const hours = Math.floor((n % d) / h);
  const minutes = Math.floor((n % d) % h);

  const sD = days > 0 ? days + "d" : "";
  const sH = hours > 0 ? hours + "h" : "";
  const sM = minutes > 0 ? minutes + "m" : "";

  return `${sD} ${sH} ${sM}`.trim();
}
