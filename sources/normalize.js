function	normalize(Vect)
{
    var		norme;

    norme = Math.sqrt(Vect.x * Vect.x + Vect.y * Vect.y + Vect.z * Vect.z);
    Vect.x /= norme;
    Vect.y /= norme;
    Vect.z /= norme;
}
