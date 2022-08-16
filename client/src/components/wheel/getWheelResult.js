const getWheelResult = (deg) => {
    const actualDeg = deg % 360;

    if (actualDeg >= 0 && actualDeg <= 45) {
        return "Heart"
    } else if (actualDeg >= 46 && actualDeg <= 90) {
        return 'Kiss'
    } else if (actualDeg >= 91 && actualDeg <= 135) {
        return "Moon"
    } else if (actualDeg >= 136 && actualDeg <= 180) {
        return "Star"
    } else if (actualDeg >= 181 && actualDeg <= 225) {
        return "Cloud"
    } else if (actualDeg >= 226 && actualDeg <= 270) {
        return "Hipnosa"
    } else if (actualDeg >= 271 && actualDeg <= 315) {
        return "Rainbow"
    } else if (actualDeg >= 316 && actualDeg <= 360) {
        return "Lollipop"
    }
}

export default getWheelResult