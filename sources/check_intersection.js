function	check_intersection_2(va, obj, color, min_distance)
{
    va.distance = inter_cylindre(va, obj.cyl);
    if ((va.distance < min_distance || min_distance == 0) && va.distance > 0)
    {
        min_distance = va.distance;
        color = light_object(va, min_distance, obj.cyl, obj);
    }
    va.distance = inter_cone(va, obj.cone);
    if ((va.distance < min_distance || min_distance == 0) && va.distance > 0)
    {
        min_distance = va.distance;
        color = light_object(va, min_distance, obj.cone, obj);
    }
    return (color);
}

function	check_intersection(va, obj)
{
    var		color = [];
    var		min_distance;

    color = [0, 0, 0];
    min_distance = 0;
    va.distance = inter_plan(va, obj.plan);
    if ((va.distance < min_distance || min_distance == 0) && va.distance > 0)
    {
        min_distance = va.distance;
        color = light_object(va, min_distance, obj.plan, obj);
    }
    va.distance = inter_sphere(va, obj.sph1);
    if ((va.distance < min_distance || min_distance == 0) && va.distance > 0)
    {
        min_distance = va.distance;
        color = light_object(va, min_distance, obj.sph1, obj);
    }
    va.distance = inter_sphere(va, obj.sph2);
    if ((va.distance < min_distance || min_distance == 0) && va.distance > 0)
    {
        min_distance = va.distance;
        color = light_object(va, min_distance, obj.sph2, obj);
    }
    return (check_intersection_2(va, obj, color, min_distance))
}
