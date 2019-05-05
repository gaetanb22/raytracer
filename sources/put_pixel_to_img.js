function	put_pixel_to_img(img, win_x, x, y, color)
{
    img.data[((y * win_x) + x) * 4 + 0] = color[0];
    img.data[((y * win_x) + x) * 4 + 1] = color[1];
    img.data[((y * win_x) + x) * 4 + 2] = color[2];
    img.data[((y * win_x) + x) * 4 + 3] = 255;
}
