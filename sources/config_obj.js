function	get_conf_plan(plan)
{
    plan.name = "plan";

    plan.ct_x = 0;
    plan.ct_y = 0;
    plan.ct_z = 150;

    plan.shine = 1;

    plan.color = [0, 200, 0];
}

function	get_conf_sph1(sph)
{
    sph.name = "sphere";

    sph.rayon = 250;

    sph.ct_x = 0;
    sph.ct_y = 0;
    sph.ct_z = 0;

    sph.shine = 0.7;

    sph.color = [255, 130, 0];
}

function	get_conf_sph2(sph)
{
    sph.name = "sphere";

    sph.rayon = 250;

    sph.ct_x = 0;
    sph.ct_y = 300;
    sph.ct_z = -200;

    sph.shine = 0.7;

    sph.color = [0, 255, 130];
}

function	get_conf_cyl(cyl)
{
    cyl.name = "cylindre";

    cyl.rayon = 70;

    cyl.ct_x = 260;
    cyl.ct_y = 300;
    cyl.ct_z = 0;

    cyl.limit_hight_z = 150;
    cyl.limit_low_z = -250;

    cyl.shine = 0.6;

    cyl.color = [190, 200, 80];
}

function	get_conf_cone(cone)
{
    cone.name = "cone";

    cone.rayon = 50;

    cone.ct_x = 250;
    cone.ct_y = -300;
    cone.ct_z = -117;

    cone.limit_hight_z = 100;
    cone.limit_low_z = 0;

    cone.shine = 1;

    cone.color = [255, 0, 0];
}
