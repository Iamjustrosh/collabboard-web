export function detectOS() {
    const userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
  
    // Windows
    if (/windows phone/i.test(userAgent)) {
      return "Windows";
    }
    if (/win/i.test(userAgent)) {
      return "Windows";
    }
  
    // macOS Intel or Apple Silicon
    if (/macintosh|mac os x/i.test(userAgent)) {
      if (navigator.userAgent.includes("ARM") || navigator.userAgent.includes("arm64")) {
        return "macOS ARM";
      }
      return "macOS Intel";
    }
  
    // Linux
    if (/linux/i.test(userAgent)) {
      return "Linux";
    }
  
    // Fallback
    return "Unknown";
  }
  