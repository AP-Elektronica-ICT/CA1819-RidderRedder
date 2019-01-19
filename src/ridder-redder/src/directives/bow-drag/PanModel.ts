


export interface Pointer {
    isTrusted: boolean;
}

export interface ChangedPointer {
    isTrusted: boolean;
}

export interface SrcEvent {
    isTrusted: boolean;
}

export interface Center {
    x: number;
    y: number;
}

export interface ZoneSymbolPointerdownfalse {
    type: string;
    state: string;
    source: string;
    zone: string;
    runCount: number;
}

export interface Target {
    __zone_symbol__pointerdownfalse: ZoneSymbolPointerdownfalse[];
}

export interface PanEvent {
    pointers: Pointer[];
    changedPointers: ChangedPointer[];
    pointerType: string;
    srcEvent: SrcEvent;
    isFirst: boolean;
    isFinal: boolean;
    eventType: number;
    center: Center;
    timeStamp: number;
    deltaTime: number;
    angle: number;
    distance: number;
    deltaX: number;
    deltaY: number;
    offsetDirection: number;
    overallVelocityX: number;
    overallVelocityY: number;
    overallVelocity: number;
    scale: number;
    rotation: number;
    maxPointers: number;
    velocity: number;
    velocityX: number;
    velocityY: number;
    direction: number;
    target: Target;
    additionalEvent: string;
    type: string;
}
