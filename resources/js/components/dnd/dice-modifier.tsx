import { sign } from '@/helpers/stringHelper';

function DiceModifier({ number }: { number: number | null | undefined }) {
    if (!number) return null;

    return sign(Math.floor((number - 10) / 2));
}

export { DiceModifier };
