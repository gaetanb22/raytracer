function	calc(va)
{
    var		color = [];
    var		obj = [];
    var		nb_obj = [];
    var		spot = [];
    var		plan = [];
    var		sph1 = [];
    var		sph2 = [];
    var		cyl = [];
    var		cone = [];

    color = [0, 0, 0];
    nb_obj.spot = 1;
    nb_obj.plan = 1;
    nb_obj.sph = 2;
    nb_obj.cyl = 1;
    nb_obj.cone = 1;
    get_conf_spot(spot);
    get_conf_plan(plan);
    get_conf_sph1(sph1);
    get_conf_sph2(sph2);
    get_conf_cyl(cyl);
    get_conf_cone(cone);
    obj = {spot, plan, sph1, sph2, cyl, cone};
    color = check_intersection(va, obj);
    return (color);
}

function	dir_vector(va)
{
    va.x1 = 100;
    va.y1 = va.win_x / 2 - va.pix_x;
    va.z1 = va.win_y / 2 - va.pix_y;
    va.DIR_x = va.x1;
    va.DIR_y = va.y1;
    va.DIR_z = va.z1;
    return (calc(va));
}

function	fill_img(va)
{
    va.pix_x = 0;
    va.pix_y = 0;
    while (va.pix_x < va.win_x)
    {
        put_pixel_to_img(va.img, va.win_x, va.pix_x, va.pix_y, dir_vector(va));
        va.pix_x++;
        if (va.pix_x == va.win_x && va.pix_y < va.win_y)
        {
            va.pix_x = 0;
            va.pix_y++;
        }
    }
    mlj_put_image_to_window(va.win, va.img, 0, 0);
}

function	main()
{
    var		va = [];

    va.win_x = 940;
    va.win_y = 940;
    va.O_x = -300;
    va.O_y = 0;
    va.O_z = 50;
    mlj_init();
    va.win = mlj_new_window(va.win_x, va.win_y, "Black");
    va.img = mlj_new_image(va.win, va.win_x, va.win_y);
    fill_img(va);
}
