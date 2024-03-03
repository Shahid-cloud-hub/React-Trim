const helper = {
  formatTime: (ms: number, hours: number): string | null => {
    if (!ms) return null;
    const date = new Date(0);
    date.setMilliseconds(Math.floor(ms));

    if (ms <= hours) {
      return date.toISOString().substr(14, 5);
    }

    return date.toISOString().substr(11, 8);
  },
};

export default helper;
