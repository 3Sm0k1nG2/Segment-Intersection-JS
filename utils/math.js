/** @private @typedef {import("../main").Point} Point */

/**
 * @param {number} A 
 * @param {number} B 
 * @param {number} t Fraction percentage 
 * @returns 
 */
export function lerp(A, B, t) {
    return A+(B-A)*t;
}

/**
 * @param {Point} A 
 * @param {Point} B 
 * @param {Point} C 
 * @param {Point} D
 */
export function getIntersection(A, B, C, D) {
    const dividend = (D.x-C.x)*(A.y-C.y) - (D.y-C.y)*(A.x-C.x);
    const divisor = (D.y-C.y)*(B.x-A.x) - (D.x-C.x)*(B.y-A.y);

    if(divisor === 0) {
        return undefined;
    }

    const t = dividend / divisor;
    const u = (A.x - C.x + (B.x - A.x)*t) / (D.x-C.x);

    if(t < 0 || t > 1 || u < 0 || u > 1){
        return undefined;
    }

    return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t
    }

    /*
        |Ix = Ax+(Bx-Ax)*t = Cx+(Dx-Cx)*u
        |Iy = Ay+(By-Ay)*t = Cy+(Dy-Cy)*u

        1.
        Ax+(Bx-Ax)*t = Cx+(Dx-Cx)*u | * (-1)

        Cx+(Dx-Cx)*u = Ax + (Bx-Ax)*t

        (Dx-Cx)*u = Ax + (Bx-Ax)*t - Cx

        2.
        Ay+(By-Ay)*t = Cy+(Dy-Cy)*u
        Ay+(By-Ay)*t - Cy = (Dy-Cy)*u | * (Dx-Cx)
        (Dx-Cx)*Ay - (Dx-Cx)*Cy + (Dx-Cx)*(By-Ay)*t = (Dx-Cx)*(Dy-Cy)*u

        (Dx-Cx)*u = Ax - Cx + (Bx-Ax)*t

        (Dx-Cx)*Ay - (Dx-Cx)*Cy + (Dx-Cx)*(By-Ay)*t = (Dy-Cy)*(Ax - Cx + (Bx-Ax)*t)
        (Dx-Cx)*Ay - (Dx-Cx)*Cy + (Dx-Cx)*(By-Ay)*t = (Dy-Cy)*Ax - (Dy-Cy)*Cx + (Dy-Cy)*(Bx-Ax)*t
        (Dx-Cx)*Ay - (Dx-Cx)*Cy + (Dx-Cx)*(By-Ay)*t - (Dy-Cy)*Ax + (Dy-Cy)*Cx - (Dy-Cy)*(Bx-Ax)*t = 0
        (Dx-Cx)*Ay - (Dx-Cx)*Cy + t*((Dx-Cx)*(By-Ay) - (Dy-Cy)*(Bx-Ax)) - (Dy-Cy)*Ax + (Dy-Cy)*Cx = 0

        t*((Dx-Cx)*(By-Ay) - (Dy-Cy)*(Bx-Ax)) = -((Dx-Cx)*Ay) + (Dx-Cx)*Cy + (Dy-Cy)*Ax - (Dy-Cy)*Cx
        t = (Dx-Cx)*(Ay-Cy) - (Dy-Cy)*(Ax-Cx) / ((Dy-Cy)*(Bx-Ax) - (Dx-Cx)*(By-Ay))
    */
}
