function	inter_sphere(va, sph)
{
    var		a;
    var		b;
    var		c;
    var		delta;
    var		k;
    var		k2;

    translation(sph.ct_x, sph.ct_y, sph.ct_z, va);
    k = 0;
    k2 = 0;
    a = Math.pow(va.DIR_x, 2) + Math.pow(va.DIR_y, 2) + Math.pow(va.DIR_z, 2);
    b = 2 * (va.DIR_x * va.O_x + va.DIR_y * va.O_y + va.DIR_z * va.O_z);
    c = Math.pow(va.O_x, 2) + Math.pow(va.O_y, 2) + Math.pow(va.O_z, 2) - Math.pow(sph.rayon, 2);
    delta = b * b - 4 * a * c;
    if (delta > 0)
    {
        k = (-b + Math.sqrt(delta)) / (2 * a);
        k2 = (-b - Math.sqrt(delta)) / (2 * a);
    }
    else if (delta == 0)
        k = b / (2 * a);
    translation(-sph.ct_x, -sph.ct_y, -sph.ct_z, va);
    return (Math.min(k, k2));
}
