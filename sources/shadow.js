function	add_shadow(va, V_light, obj, color)
{
    var		va2 = [];
    var		distance;

    va2.DIR_x = V_light.x;
    va2.DIR_y = V_light.y;
    va2.DIR_z = V_light.z;
    va2.O_x = va.intersection_x;
    va2.O_y = va.intersection_y;
    va2.O_z = va.intersection_z;
    distance = inter_sphere(va2, obj.sph1);
    if (distance > 0)
	color = ambient_light_shadow(color);
    return (color);
}
