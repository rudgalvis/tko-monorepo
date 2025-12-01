import type { MailingService } from '$lib/modules/mailing/MailingService'
import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'
import type { NotificationGroupRequirement } from '../transformers/order/resolve-notification-groups'

type StrategyConfig = {
    mailingService: MailingService
    orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
    customerName: string
    orderNumber: number
    customerEmail: string
}

// There are groups of notifications:
// - Pre orders
// - Handmade
// - Customizations
//
// Each can have multiple notifications to send.
// I.e., two pre-order items with diff-estimated shipping dates result in two notifications
export const notificationGroupHandlingStrategy = ({
    mailingService,
    orderLineInventoriesAnalyzed,
    customerName,
    orderNumber,
    customerEmail,
}: StrategyConfig) => {
    // Mapper function exported
    return async (notificationRequirement: NotificationGroupRequirement) => {
        const notificationProcessings = mailingService.processNotificationGroup({
            notificationGroupRequirement: notificationRequirement,
            orderLineInventoriesAnalyzed,
            customerName,
            orderNumber: orderNumber,
            customerEmail,
        })

        return Promise.all(notificationProcessings)
    }
}
