function	put_pixel_to_img(img, win_x, x, y, color)
{
    img.data[((y * win_x) + x) * 4 + 0] = color[0];
    img.data[((y * win_x) + x) * 4 + 1] = color[1];
    img.data[((y * win_x) + x) * 4 + 2] = color[2];
    img.data[((y * win_x) + x) * 4 + 3] = 255;
}

function	inter_plan(rt, plan)
{
    var		k;

    k = -1;
    if (rt.dir_y != 0)
        k = -(rt.o_y + plan.ct_y) / rt.dir_y;
    return (k);
}

function	inter_sphere(rt, sph)
{
    var		a;
    var		b;
    var		c;
    var		delta;
    var		k;
    var		k2;

    k = 0;
    k2 = 0;
    a = Math.pow(rt.dir_x - sph.ct_x, 2) + Math.pow(rt.dir_y - sph.ct_y, 2)
	+ Math.pow(rt.dir_z - sph.ct_z, 2);
    b = 2 * ((rt.dir_x - sph.ct_x) * rt.o_x + (rt.dir_y - sph.ct_y) * rt.o_y
	     + (rt.dir_z - sph.ct_z) * rt.o_z);
    c = Math.pow(rt.o_x, 2) + Math.pow(rt.o_y, 2) + Math.pow(rt.o_z, 2)
	- Math.pow(sph.rayon, 2);
    delta = b * b - 4 * a * c;
    if (delta > 0)
    {
        k = (-b + Math.sqrt(delta)) / (2 * a);
        k2 = (-b - Math.sqrt(delta)) / (2 * a);
    }
    else if (delta == 0)
        k = b / (2 * a);
    return (Math.min(k, k2));
}

function	inter_sphere_shadow(rt, sph)
{
    var		a;
    var		b;
    var		c;
    var		delta;
    var		k;
    var		k2;

    k = 0;
    k2 = 0;
    a = Math.pow(rt.dir_x - sph.ct_x, 2) + Math.pow(rt.dir_y - sph.ct_y, 2)
	+ Math.pow(rt.dir_z - sph.ct_z, 2);
    b = 2 * ((rt.dir_x - sph.ct_x) * rt.o_x + (rt.dir_y - sph.ct_y) * rt.o_y
	     + (rt.dir_z - sph.ct_z) * rt.o_z);
    c = Math.pow(rt.o_x, 2) + Math.pow(rt.o_y, 2) + Math.pow(rt.o_z, 2)
	- Math.pow(sph.rayon, 2);
    delta = b * b - 4 * a * c;
    if (delta > 0)
    {
        k = (-b + Math.sqrt(delta)) / (2 * a);
        k2 = (-b - Math.sqrt(delta)) / (2 * a);
    }
    else if (delta == 0)
        k = b / (2 * a);
    return (Math.min(k, k2));
}

function	get_intersection_point(rt)
{
    rt.inter_x = rt.o_x + rt.dir_x * rt.k;
    rt.inter_y = rt.o_y + rt.dir_y * rt.k;
    rt.inter_z = rt.o_z + rt.dir_z * rt.k;
}

function	normlise(vect)
{
    var		norme;

    norme = vect.x * vect_x + vect.y * vect.y + vect.z * vect.z;
    vect.x /= norme;
    vect.y /= norme;
    vect.z /= norme;
}

function	add_shadow(rt, objs, obj, spot)
{
    var		rt2;
    var		k;

    rt2 = [];
    get_intersection_point(rt);
    rt2.dir_x = spot.ct_x - rt.inter_x;
    rt2.dir_y = spot.ct_y - rt.inter_y;
    rt2.dir_z = spot.ct_z - rt.inter_z;
    rt2.o_x = rt.inter_x;
    rt2.o_y = rt.inter_y;
    rt2.o_z = rt.inter_z;
    k = inter_sphere_shadow(rt2, objs[1]);
    if (k > 0 && k < 1)
        rt.color = [0, 0, 0];
}

function	check_intersection(rt, objs, spots)
{
    var		i;
    var		t;
    var		min_k;

    i = 0;
    min_k = 0;
    while (objs[i] != "end")
    {
	if (objs[i].name == "plan")
	{
	    rt.k = inter_plan(rt, objs[i]);
	    if ((rt.k < min_k || min_k == 0) && rt.k > 0)
	    {
		min_k = rt.k;
		t = 0;
		rt.color = [0, 0, 255];
		while (spots[t] != "end")
		{
		    add_shadow(rt, objs, objs[i], spots[t]);
		    t++;
		}
	    }
	}
	if (objs[i].name == "sphere")
	{
	    rt.k = inter_sphere(rt, objs[i]);
	    if ((rt.k < min_k || min_k == 0) && rt.k > 0)
	    {
		min_k = rt.k;
		rt.color = [0, 255, 0];
	    }
	}
	i++;
    }
}

function	calc(rt, objs, spots)
{
    rt.dir_x = rt.win_x / 2 - rt.pix_x;
    rt.dir_y = rt.win_y / 2 - rt.pix_y;
    rt.dir_z = 100;
    rt.color = [0, 0, 0];
    check_intersection(rt, objs, spots);
    return (rt.color);
}

function	fill_img(rt, objs, spots)
{
    rt.pix_x = 0;
    rt.pix_y = 0;
    while (rt.pix_x < rt.win_x)
    {
        put_pixel_to_img(rt.img, rt.win_x, rt.pix_x, rt.pix_y, calc(rt, objs, spots));
        rt.pix_x++;
        if (rt.pix_x == rt.win_x && rt.pix_y < rt.win_y)
        {
            rt.pix_x = 0;
            rt.pix_y++;
        }
    }
    mlj_put_image_to_window(rt.win, rt.img, 0, 0);
}

function	get_conf_spot1(spot)
{
    spot.name = "spot";

    spot.ct_x = 0;
    spot.ct_y = 300;
    spot.ct_z = -300;

    spot.color = [0, 200, 0];
}

function	get_conf_spot2(spot)
{
    spot.name = "spot";

    spot.ct_x = -300;
    spot.ct_y = 300;
    spot.ct_z = -300;

    spot.color = [0, 200, 0];
}

function	get_conf_plan(plan)
{
    plan.name = "plan";

    plan.ct_y = 150;

    plan.shine = 1;

    plan.color = [0, 200, 0];
}

function	get_conf_sph(sph)
{
    sph.name = "sphere";

    sph.rayon = 250;

    sph.ct_x = 0;
    sph.ct_y = 0;
    sph.ct_z = 0;

    sph.shine = 0.7;

    sph.color = [255, 130, 0];
}

function	get_eye(rt)
{
    rt.o_x = 0;
    rt.o_y = 10;
    rt.o_z = -300;
}

function	get_obj()
{
    var		objs;
    var		plan;
    var		sph;

    objs = [];
    plan = [];
    sph = [];
    get_conf_plan(plan);
    get_conf_sph(sph);
    objs = [plan, sph, "end"];
    return (objs);
}

function	get_spot()
{
    var		spots;
    var		spot1;
    var		spot2;

    spots = [];
    spot1 = [];
    spot2 = [];
    get_conf_spot1(spot1);
    get_conf_spot2(spot2);
    spots = [spot1, "end"];
    return (spots);
}

function	main()
{
    var		rt;
    var		objs;
    var		spots;

    rt = [];
    objs = [];
    spots = [];
    rt.win_x = 940;
    rt.win_y = 940;
    mlj_init();
    rt.win = mlj_new_window(rt.win_x, rt.win_y, "white");
    rt.img = mlj_new_image(rt.win, rt.win_x, rt.win_y);
    get_eye(rt);
    objs = get_obj();
    spots = get_spot();
    fill_img(rt, objs, spots);
    mlj_loop();
}
