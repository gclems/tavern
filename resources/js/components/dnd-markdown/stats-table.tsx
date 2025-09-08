import { DiceModifier } from '../dnd/dice-modifier';

function StatsTable({ str, dex, con, int, wis, cha }: { str: number; dex: number; con: number; int: number; wis: number; cha: number }) {
    return (
        <table className="border-dnd-primary border-collapse border-2">
            <thead>
                <tr className="border-dnd-primary bg-dnd-primary/10 border-b [&_th]:px-2">
                    <th>For</th>
                    <th>Dex</th>
                    <th>Con</th>
                    <th>Int</th>
                    <th>Sag</th>
                    <th>Cha</th>
                </tr>
            </thead>
            <tbody className="[&_td]:px-2 [&_td]:text-center">
                <tr className="border-dnd-primary/20 border-b">
                    <td>{str}</td>
                    <td>{dex}</td>
                    <td>{con}</td>
                    <td>{int}</td>
                    <td>{wis}</td>
                    <td>{cha}</td>
                </tr>
                <tr className="bg-dnd-primary/10 font-semibold">
                    <td>
                        <DiceModifier number={str} />
                    </td>
                    <td>
                        <DiceModifier number={dex} />
                    </td>
                    <td>
                        <DiceModifier number={con} />
                    </td>
                    <td>
                        <DiceModifier number={int} />
                    </td>
                    <td>
                        <DiceModifier number={wis} />
                    </td>
                    <td>
                        <DiceModifier number={cha} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export { StatsTable };
