import { ProductsRepository } from '$lib/shopify/repositories/ProductsRepository'
import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'
import { extractPreOrdersItems, getUniqueVariants } from '$lib/utils/helpers/order-line-inventory-analyzed.helper'
import type { DescriptiveVariantIdentifier } from '$lib/utils/transformers/order/parse-order-webhook'

export enum NotificationType {
    preorder = 'preorder',
    handmade = 'handmade',
    customization = 'customization',
}


// TODO: Consider renaming to Notification Qualification
export type NotificationGroupRequirement = {
    group: NotificationType
    items?: DescriptiveVariantIdentifier[]
    reason: string
}

const VERBOSE = false

/**
 * Analyzes order line items to determine what notifications need to be sent to the customer
 * based on the types of products ordered (preorder, handmade, customization, etc.)
 */
export const resolveNotificationGroups = async (
    orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[],
    orderNote: string | null
): Promise<NotificationGroupRequirement[]> => {
    const qualifications: NotificationGroupRequirement[] = []

    // Check for preorders
    const preorderItems = extractPreOrdersItems(orderLineInventoriesAnalyzed)
    if (preorderItems.length > 0) {
        const uniqueProducts = getUniqueVariants(preorderItems)
        qualifications.push({
            group: NotificationType.preorder,
            items: uniqueProducts,
            reason: `Found ${uniqueProducts.length} preorder items for products: ${uniqueProducts.map((product) => product.title).join(', ')}`,
        })
    }

    // Check for handmade items
    const handmadeItems = await checkForHandmadeItems(orderLineInventoriesAnalyzed)
    if (handmadeItems.length > 0) {
        const uniqueProducts = getUniqueVariants(handmadeItems)
        qualifications.push({
            group: NotificationType.handmade,
            items: uniqueProducts,
            reason: `Found ${handmadeItems.length} handmade items for products: ${uniqueProducts.map((product) => product.title).join(', ')}`,
        })
    }

    // Check for customization items
    if (checkNoteForCustomizations(orderNote)) {
        qualifications.push({
            group: NotificationType.customization,
            reason: `Found order customization instructions`,
        })
    }

    // Minimize notifications
    const minimizedNotifications = minimizeNotifications(qualifications)

    // Log what was filtered out
    const originalTypes = qualifications.map(n => n.group);
    const minimizedTypes = minimizedNotifications.map(n => n.group);
    const filteredOut = qualifications.filter(
        n => !minimizedNotifications.some(m => m.group === n.group)
    );

    if (VERBOSE && filteredOut.length > 0) {
        console.log(`Notification filtering applied:`);
        console.log(`  Original: [${originalTypes.join(', ')}]`);
        console.log(`  Minimized: [${minimizedTypes.join(', ')}]`);
        console.log(`  Filtered out: [${filteredOut.map(f => f.group).join(', ')}]`);
    }

    return minimizedNotifications
}

const checkNoteForCustomizations = (orderNote: string | null): boolean => !!orderNote

const checkForHandmadeItems = async (
    orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
): Promise<OrderLineInventoryAnalyzed[]> => {
    const productsRepository = new ProductsRepository()

    const r = await productsRepository.getProductsTags(
        orderLineInventoriesAnalyzed.map((e) => e.product.id)
    )

    if (!r) return []

    return r
        .map((e, i) => {
            return e.includes('handmade') ? orderLineInventoriesAnalyzed[i] : undefined
        })
        .filter((e) => e) as OrderLineInventoryAnalyzed[]
}

const minimizeNotifications = (notificationQualifications: NotificationGroupRequirement[]) => {
    const types = notificationQualifications.map((q) => q.group)

    const filterBy = (allowedTypes: NotificationType[]) =>
        notificationQualifications.filter((q) => allowedTypes.includes(q.group))

    const hasAllTypes = (requiredTypes: NotificationType[]) =>
        requiredTypes.every((type) => types.includes(type))

    // Priority order: most restrictive combinations first
    if (hasAllTypes([NotificationType.preorder, NotificationType.handmade, NotificationType.customization])) {
        return filterBy([NotificationType.preorder, NotificationType.customization])
    }
    if (hasAllTypes([NotificationType.preorder, NotificationType.handmade])) {
        return filterBy([NotificationType.preorder])
    }
    if (hasAllTypes([NotificationType.preorder, NotificationType.customization])) {
        return filterBy([NotificationType.customization])
    }
    if (hasAllTypes([NotificationType.handmade, NotificationType.customization])) {
        return filterBy([NotificationType.customization])
    }

    return notificationQualifications
}
