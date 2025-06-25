export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - date.getTime();

  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (days < 30) {
    return `${Math.floor(days / 7)} week${
      Math.floor(days / 7) > 1 ? "s" : ""
    } ago`;
  } else if (days < 365) {
    return `${Math.floor(days / 30)} month${
      Math.floor(days / 30) > 1 ? "s" : ""
    } ago`;
  } else {
    return `${Math.floor(days / 365)} year${
      Math.floor(days / 365) > 1 ? "s" : ""
    } ago`;
  }
}
