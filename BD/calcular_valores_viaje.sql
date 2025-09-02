-- FUNCTION: public.calcular_valores_viaje()

-- DROP FUNCTION IF EXISTS public.calcular_valores_viaje();

CREATE OR REPLACE FUNCTION public.calcular_valores_viaje()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
    -- Calcular total neto
    NEW.total_neto := NEW.valor - COALESCE(NEW.comision, 0) - COALESCE(NEW.descargue, 0);

    -- Calcular porcentajes
    NEW.porcentaje_65 := NEW.total_neto * 0.65;
    NEW.porcentaje_35 := NEW.total_neto * 0.35;

    -- Calcular saldos si hay anticipo
    IF NEW.valor_anticipo > 0 THEN
        NEW.saldo_a_pagar := NEW.valor - NEW.valor_anticipo;
        NEW.saldos_anticipos := NEW.valor_anticipo - NEW.porcentaje_65 - COALESCE(NEW.comision, 0) - COALESCE(NEW.descargue, 0);
    ELSE
        NEW.saldo_a_pagar := NEW.valor;
        NEW.saldos_anticipos := 0;
    END IF;

    RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.calcular_valores_viaje()
    OWNER TO track;


CREATE OR REPLACE TRIGGER trigger_calcular_valores
    BEFORE INSERT OR UPDATE
    ON public.viajes
    FOR EACH ROW
    EXECUTE FUNCTION public.calcular_valores_viaje();
