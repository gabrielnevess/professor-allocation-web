function formatTime(inputTime: string) {
    const timeFormatWithSeconds = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    const timeFormatWithoutSeconds = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (timeFormatWithSeconds.test(inputTime)) {
        return inputTime.slice(0, 5);
    } else if (timeFormatWithoutSeconds.test(inputTime)) {
        return `${inputTime}:00`;
    } else {
        return inputTime;
    }
}

export { formatTime };
