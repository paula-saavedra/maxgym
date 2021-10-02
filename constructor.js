class Clase {
  constructor(id, disciplina, horario, dia, profesor, lugares, imagen) {
    this.id = id;
    this.disciplina = disciplina.toUpperCase();
    this.horario = horario;
    this.dia = dia.toUpperCase();
    this.profesor = profesor.toUpperCase();
    this.lugares = lugares;
    this.imagen = imagen;
  }
  //metodo (informar red social de la disciplina)
  informarRedSocial() {
    console.log(
      "Enterate de las ultimas novedades en " + this.disciplina + "_gymmax"
    );
  }
}

const clase1 = new Clase(
  "N1",
  "Funcional",
  "13.30",
  "LUNES",
  "Natalia",
  8,
  "01"
);
const clase2 = new Clase(
  "N2",
  "Spinning",
  "18.30",
  "Miércoles",
  "Cecilia",
  7,
  "02"
);
const clase3 = new Clase("N3", "GAP", "9.30", "Viernes", "Lucas", 8, "03");
const clase4 = new Clase(
  "N4",
  "Futbol",
  "19.00",
  "Jueves",
  "Ignacio",
  12,
  "04"
);
const clase5 = new Clase("N5", "Futbol", "9.00", "Sábado", "Martín", 12, "05");
const clase6 = new Clase(
  "N6",
  "Pilates",
  "17.00",
  "LUNES",
  "Florencia",
  8,
  "06"
);
const clase7 = new Clase("N7", "Pilates", "20.00", "LUNES", "Micaela", 8, "07");
const clase8 = new Clase("N8", "Pilates", "14.00", "Martes", "Jesica", 8, "08");
const clase9 = new Clase(
  "N9",
  "Futbol",
  "19.00",
  "Viernes",
  "Martín",
  12,
  "09"
);
const clase10 = new Clase(
  "N10",
  "Spinning",
  "18.30",
  "LUNES",
  "Cecilia",
  10,
  "010"
);