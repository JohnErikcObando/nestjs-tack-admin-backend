-- FUNCTION: public.registrar_pago_seguridad_social()

-- DROP FUNCTION IF EXISTS public.registrar_pago_seguridad_social();

CREATE OR REPLACE FUNCTION public.registrar_pago_seguridad_social()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    -- Verificar si es el primer día del mes
    IF EXTRACT(DAY FROM CURRENT_DATE) = 17 THEN
        -- Verificar si ya se registró el pago este mes
        IF NOT EXISTS (
            SELECT 1 FROM movimientos
            WHERE descripcion = 'Pago mensual de Seguridad Social'
            AND EXTRACT(MONTH FROM fecha) = EXTRACT(MONTH FROM CURRENT_DATE)
            AND EXTRACT(YEAR FROM fecha) = EXTRACT(YEAR FROM CURRENT_DATE)
        ) THEN
            -- Insertar el registro de seguridad social
            INSERT INTO movimientos (
                fecha,
                tipo,
                descripcion,
                valor,
                pago,
                created_at,
                updated_at
            ) VALUES (
                CURRENT_DATE,
                'Gasto',
                'Pago mensual de Seguridad Social',
                233500,
                false,
                CURRENT_TIMESTAMP,
                CURRENT_TIMESTAMP
            );
        END IF;
    END IF;

    RETURN NULL;
END;
$BODY$;

ALTER FUNCTION public.registrar_pago_seguridad_social()
    OWNER TO track;



CREATE OR REPLACE TRIGGER trigger_pago_seguridad_social
    AFTER INSERT
    ON public.movimientos
    FOR EACH STATEMENT
    EXECUTE FUNCTION public.registrar_pago_seguridad_social();
