export function tagColor(tag: string): string {
    const hue = stringHash(tag) % 360;
    return `hsl(${hue}, 70%, 85%)`;
}

export function stringHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

export function makeHueFromId(id: number): number {
    return id * 137 % 360
}