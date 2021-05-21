export interface EmployeeForm {
    nombre: string;
    fecha_de_nacimiento: string;
    lugar_de_nacimiento?: string;
    calle?: string;
    municipio: string;
    codigo_postal?: string;
    telefono_casa?: string,
    telefono_celular?: string,
    secciones: {

        ultimo_ejemplo_o_actividad: {
            ultimo_periodo: string;
            empresa: string;
            puesto: string;
            responsabilidad?: string
        },

        actividad_deseada: {
            jornada_de_trabajo: string;
            funcion: string;
            capacitacion_o_entrenamiento?: string,
            consultoria?: string,
            coaching?: string
        },

        nivel_de_estudios: {
            nivel_escolar: string;
            nombre_institucion: string;
            fecha_inicio: string;
            fecha_fin: string
        },

        comentarios: {
            porque_quieres_trabajo: string
        },

        tus_habilidades_son: {
            habilidades?: string[]
        },

        clasificacion_puesto: {
            clasificacion: string
        },

        aceptacion_politica: {
            aceptacion: boolean
        }
    }
}

export interface CompanyForm {
    nombre_empresa: string,
    direccion_actual: string,
    municipio: string,
    estado: string,
    telefono_1?: string,
    telefono_2: string,
}