import { sign } from '@/helpers/strings';

function DiceModifier({ number }: { number: number | null | undefined }) {
    if (!number) return null;

    return sign(Math.floor((number - 10) / 2));
}

export { DiceModifier };
