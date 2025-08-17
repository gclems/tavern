import { FlashMessageParam, FlashMessageTranslation } from '@/types/flash';

const FlashMessages: FlashMessageTranslation = {
    'expense.create.success': ({ name }: FlashMessageParam) => `Dépense "${name}" ajoutée.`,
};

export default FlashMessages;
