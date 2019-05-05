function	check_limit(va, distance, obj)
{
    va.intersection_x = va.O_x + va.DIR_x * distance;
    va.intersection_y = va.O_y + va.DIR_y * distance;
    va.intersection_z = va.O_z + va.DIR_z * distance;
    if (obj.limit_hight_z < va.intersection_z || obj.limit_low_z > va.intersection_z)
        return (1);
    return (0);
}
