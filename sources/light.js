function	add_shine(color, angle, obj, spot)
{
    color[0] = color[0] + obj.shine * spot.color[0] * angle;
    color[1] = color[1] + obj.shine * spot.color[1] * angle;
    color[2] = color[2] + obj.shine * spot.color[2] * angle;
}

function	ambient_light(color, obj)
{
    color[0] += obj.color[0] /= 5;
    color[1] += obj.color[1] /= 5;
    color[2] += obj.color[2] /= 5;
    return (color);
}

function	ambient_light_shadow(color)
{
    color[0] /= 5;
    color[1] /= 5;
    color[2] /= 5;
    return (color);
}

function	color_plan(obj, va)
{
    var		tmp;

    if (obj.name == "plan")
    {
        if (va.intersection_y % 100 > -50)
        {
            tmp = obj.color[1];
            obj.color[1] = obj.color[2];
            obj.color[2] = tmp;
        }
        if (va.intersection_y % 100 > 50)
        {
            tmp = obj.color[1];
            obj.color[1] = obj.color[2];
            obj.color[2] = tmp;
        }
        if (va.intersection_x % 100 > -50)
        {
            tmp = obj.color[1];
            obj.color[1] = obj.color[2];
            obj.color[2] = tmp;
        }
        if (va.intersection_x % 100 > 50)
        {
            tmp = obj.color[1];
            obj.color[1] = obj.color[2];
            obj.color[2] = tmp;
        }
    }
}

function	light_object(va, distance, obj, obj_all)
{
    var		V_light = [];
    var		V_light_n = [];
    var		V_normal = [];
    var		angle;
    var		color = [];

    va.intersection_x = va.O_x + va.DIR_x * distance;
    va.intersection_y = va.O_y + va.DIR_y * distance;
    va.intersection_z = va.O_z + va.DIR_z * distance;
    V_light.x = obj_all.spot.x - va.intersection_x;
    V_light.y = obj_all.spot.y - va.intersection_y;
    V_light.z = obj_all.spot.z - va.intersection_z;
    V_light_n.x = obj_all.spot.x - va.intersection_x;
    V_light_n.y = obj_all.spot.y - va.intersection_y;
    V_light_n.z = obj_all.spot.z - va.intersection_z;
    normalize(V_light);
    get_object_normal(V_normal, va, obj);
    normalize(V_normal);
    color_plan(obj, va);
    if ((angle = (V_light.x * V_normal.x + V_light.y * V_normal.y + V_light.z * V_normal.z)) < 0)
        return ([obj.color[0] /= 5, obj.color[1] /= 5, obj.color[2] /= 5]);
    color = [obj.color[0]  * angle, obj.color[1] * angle, obj.color[2] * angle];
    color = ambient_light(color, obj);
    add_shine(color, angle, obj, obj_all.spot);
    color = add_shadow(va, V_light_n, obj_all, color);
    return (color);
}
