
// INTERPOLATION
function Lerp(a, b, t) {
    return a + (b - a) * t;
}

function QuadraticLerp(t) {
    return t * t;
}

function InverseQuadraticLerp(t) {
    return 1 - (1 - t) * (1 - t);
}


// BASICS
function Sign(x) {
    return x < 0 ? -1 : x > 0 ? 1 : 0;
}

function Clamp(x, min, max) {
    return x < min ? min : x > max ? max : x;
}

function Abs(x) {
    return x < 0 ? -x : x;
}