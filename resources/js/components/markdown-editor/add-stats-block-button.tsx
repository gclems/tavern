import { useEffect, useState } from 'react';

import { CheckIcon, TableIcon, XIcon } from 'lucide-react';
import { Button, Input, Label, SimpleDialog, SimpleTooltip } from 'shanty-ui';

import { DiceModifier } from '../dnd/dice-modifier';

function AddStatsBlockButton({ onSubmit }: { onSubmit?: (text: string) => void }) {
    const [open, setOpen] = useState<boolean>(false);

    const [stats, setStats] = useState<{
        str: number | null;
        dex: number | null;
        con: number | null;
        int: number | null;
        wis: number | null;
        cha: number | null;
    }>({
        str: null,
        dex: null,
        con: null,
        int: null,
        wis: null,
        cha: null,
    });

    const handleSubmit = () => {
        onSubmit?.(`:stats[${stats.str ?? ''},${stats.dex ?? ''},${stats.con ?? ''},${stats.int ?? ''},${stats.wis ?? ''},${stats.cha ?? ''}]`);
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            setStats({
                str: null,
                dex: null,
                con: null,
                int: null,
                wis: null,
                cha: null,
            });
        }
    }, [open]);

    return (
        <SimpleDialog.Root open={open} onOpenChange={setOpen}>
            <SimpleTooltip content="Ajouter un bloc statistiques">
                <SimpleDialog.Trigger>
                    <Button variant="ghost">
                        <TableIcon />
                    </Button>
                </SimpleDialog.Trigger>
            </SimpleTooltip>
            <SimpleDialog.Popup>
                <SimpleDialog.Header title="Insérer un bloc statistiques" />

                <div className="space-y-4">
                    <table>
                        <thead>
                            <tr className="[&_th]:px-2 [&_th]:text-center">
                                <th>
                                    <Label htmlFor="str" required>
                                        For
                                    </Label>
                                </th>
                                <th>
                                    <Label htmlFor="dex" required>
                                        Dex
                                    </Label>
                                </th>
                                <th>
                                    <Label htmlFor="con" required>
                                        Con
                                    </Label>
                                </th>
                                <th>
                                    <Label htmlFor="int" required>
                                        Int
                                    </Label>
                                </th>
                                <th>
                                    <Label htmlFor="wis" required>
                                        Sag
                                    </Label>
                                </th>
                                <th>
                                    <Label htmlFor="cha" required>
                                        Cha
                                    </Label>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="[&_td]:px-2">
                                <td>
                                    <Input
                                        id="str"
                                        name="str"
                                        type="number"
                                        autoFocus
                                        required
                                        tabIndex={1}
                                        min={0}
                                        max={25}
                                        value={stats.str ?? ''}
                                        onChange={(e) => setStats({ ...stats, str: +e.target.value })}
                                        placeholder="10"
                                    />
                                </td>
                                <td>
                                    <Input
                                        id="dex"
                                        name="dex"
                                        type="number"
                                        required
                                        tabIndex={2}
                                        min={0}
                                        max={25}
                                        value={stats.dex ?? ''}
                                        onChange={(e) => setStats({ ...stats, dex: +e.target.value })}
                                        placeholder="10"
                                    />
                                </td>
                                <td>
                                    <Input
                                        id="con"
                                        name="con"
                                        type="number"
                                        required
                                        tabIndex={3}
                                        min={0}
                                        max={25}
                                        value={stats.con ?? ''}
                                        onChange={(e) => setStats({ ...stats, con: +e.target.value })}
                                        placeholder="10"
                                    />
                                </td>
                                <td>
                                    <Input
                                        id="int"
                                        name="int"
                                        type="number"
                                        required
                                        tabIndex={4}
                                        min={0}
                                        max={25}
                                        value={stats.int ?? ''}
                                        onChange={(e) => setStats({ ...stats, int: +e.target.value })}
                                        placeholder="10"
                                    />
                                </td>
                                <td>
                                    <Input
                                        id="wis"
                                        name="wis"
                                        type="number"
                                        required
                                        tabIndex={5}
                                        min={0}
                                        max={25}
                                        value={stats.wis ?? ''}
                                        onChange={(e) => setStats({ ...stats, wis: +e.target.value })}
                                        placeholder="10"
                                    />
                                </td>
                                <td>
                                    <Input
                                        id="cha"
                                        name="cha"
                                        type="number"
                                        required
                                        tabIndex={6}
                                        min={0}
                                        max={25}
                                        value={stats.cha ?? ''}
                                        onChange={(e) => setStats({ ...stats, cha: +e.target.value })}
                                        placeholder="10"
                                    />
                                </td>
                            </tr>
                            <tr className="[&_td]:text-center">
                                <td>
                                    <DiceModifier number={stats.str} />
                                </td>
                                <td>
                                    <DiceModifier number={stats.dex} />
                                </td>
                                <td>
                                    <DiceModifier number={stats.con} />
                                </td>
                                <td>
                                    <DiceModifier number={stats.int} />
                                </td>
                                <td>
                                    <DiceModifier number={stats.wis} />
                                </td>
                                <td>
                                    <DiceModifier number={stats.cha} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <SimpleDialog.Footer className="">
                    <SimpleDialog.Close>
                        <Button variant="ghost">
                            <XIcon />
                        </Button>
                    </SimpleDialog.Close>
                    <Button variant="ghost" onClick={handleSubmit}>
                        <CheckIcon />
                    </Button>
                </SimpleDialog.Footer>
            </SimpleDialog.Popup>
        </SimpleDialog.Root>
    );
}

export { AddStatsBlockButton };
