function	inter_cylindre(va, cyl)
{
    var		a;
    var		b;
    var		c;
    var		delta;
    var		k;
    var		k2;

    translation(cyl.ct_x, cyl.ct_y, cyl.ct_z, va);
    k = 0;
    k2 = 0;
    a = Math.pow(va.DIR_x, 2) + Math.pow(va.DIR_y, 2);
    b = 2 * (va.O_x * va.DIR_x + va.O_y * va.DIR_y);
    c = Math.pow(va.O_x, 2) + Math.pow(va.O_y, 2) - Math.pow(cyl.rayon, 2);
    delta = b * b - 4 * a * c;
    if (delta > 0)
    {
        k = (-b + Math.sqrt(delta)) / (2 * a);
        k2 = (-b - Math.sqrt(delta)) / (2 * a);
    }
    else if (delta == 0)
        k = b / (2 * a);
    translation(-cyl.ct_x, -cyl.ct_y, -cyl.ct_z, va);
    if (check_limit(va, Math.min(k, k2), cyl) == 1)
        return (0);
    return (Math.min(k, k2));
}
