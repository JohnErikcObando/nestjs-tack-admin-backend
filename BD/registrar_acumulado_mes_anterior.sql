-- FUNCTION: public.registrar_acumulado_mes_anterior()

-- DROP FUNCTION IF EXISTS public.registrar_acumulado_mes_anterior();

CREATE OR REPLACE FUNCTION public.registrar_acumulado_mes_anterior()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    fecha_inicio_mes DATE;
    fecha_fin_mes DATE;
    acumulado_mes NUMERIC(15,2);
    mes_anterior TEXT;
BEGIN
    -- Verificar si es el primer día del mes
    IF EXTRACT(DAY FROM CURRENT_DATE) <> 1 THEN
        RETURN NULL;
    END IF;

    -- Calcular rango del mes anterior
    fecha_inicio_mes := DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month');
    fecha_fin_mes := DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 day';

    -- Obtener nombre del mes anterior en español
    mes_anterior := TO_CHAR(fecha_inicio_mes, 'TMMonth');

    -- Calcular el acumulado del mes anterior (suma de anticipos menos gastos no pagados)
    SELECT COALESCE(SUM(CASE
                        WHEN tipo = 'anticipo' THEN valor
                        WHEN tipo = 'gasto' AND pago = false THEN -valor
                        ELSE 0
                      END), 0)
    INTO acumulado_mes
    FROM movimientos
    WHERE fecha BETWEEN fecha_inicio_mes AND fecha_fin_mes;

    -- Insertar el registro del acumulado del mes anterior
    INSERT INTO movimientos (fecha, tipo, descripcion, valor, pago, created_at, updated_at)
    VALUES (
        fecha_fin_mes,
        'anticipo',
        'Valor anticipo mes (' || mes_anterior || ')',
        acumulado_mes,
        false,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.registrar_acumulado_mes_anterior()
    OWNER TO track;



CREATE OR REPLACE TRIGGER trigger_acumulado_mensual
    AFTER INSERT
    ON public.movimientos
    FOR EACH STATEMENT
    EXECUTE FUNCTION public.registrar_acumulado_mes_anterior();
