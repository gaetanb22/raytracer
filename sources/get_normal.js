function	get_object_normal(V_normal, va, obj)
{
    if (obj.name == "plan")
    {
        V_normal.x = 0 + obj.ct_x;
        V_normal.y = 0 + obj.ct_y;
        V_normal.z = 1 + obj.ct_z;
	 V_normal.y += Math.cos(va.intersection_y / 10) * (V_normal.x / 10 + V_normal.y / 10 + V_normal.z / 10);
    }
    else if (obj.name == "sphere")
    {
        V_normal.x = va.intersection_x + obj.ct_x;
        V_normal.y = va.intersection_y + obj.ct_y;
        V_normal.z = va.intersection_z + obj.ct_z;
    }
    else if (obj.name == "cylindre")
    {
        V_normal.x = va.intersection_x + obj.ct_x;
        V_normal.y = va.intersection_y + obj.ct_y;
        V_normal.z = 0 + obj.ct_z;
    }
    else if (obj.name == "cone")
    {
        V_normal.x = va.intersection_x + obj.ct_x;
        V_normal.y = va.intersection_y + obj.ct_y;
        V_normal.z = obj.rayon * va.intersection_z + obj.ct_z;
    }
}
