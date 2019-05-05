function	inter_plan(va, plan)
{
    var		k;

    k = -1;
    if (va.DIR_z != 0)
        k = -(va.O_z + plan.ct_z) / va.DIR_z;
    return (k);
}
