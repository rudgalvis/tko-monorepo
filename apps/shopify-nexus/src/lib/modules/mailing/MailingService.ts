import {
    MAIL_FROM_NAME,
    MAIL_REPLY_TO,
    MAILGUN_DOMAIN,
    MAILGUN_FROM_USER,
} from '$env/static/private'
import { Mailgun, type SendMailStatus } from '$lib/modules/mailing/Mailgun'
import CustomizedOrderEmailTemplate from '$lib/modules/mailing/templates/CustomizedOrderEmailTemplate.svelte'
import HandmadeOrderEmailTemplate from '$lib/modules/mailing/templates/HandmadeOrderEmailTemplate.svelte'
import PreOrderEmailTemplate from '$lib/modules/mailing/templates/PreOrderEmailTemplate.svelte'
import type { OrderLineInventoryAnalyzed } from '$lib/types/OrderLineInventoryAnalyzed'
import {
    NotificationType,
    type NotificationGroupRequirement,
} from '$lib/utils/transformers/order/resolve-notification-groups'
import { render } from 'svelte/server'

export type PreorderMailItem = {
    customerName: string
    productTitle: string
    orderId: string
    estimatedShippingDate?: string
}

export type NotificationProcessStatus = {
    mailingStatus: SendMailStatus
    forItem?: string
    group: NotificationType
}

export type OrderNotificationType = 'preorder' | 'handmade' | 'customization' | 'none'

export type NotificationDecision = {
    type: OrderNotificationType
    shouldSend: boolean
    reason: string
}

type NotificationGroupOptions = {
    notificationGroupRequirement: NotificationGroupRequirement
    orderLineInventoriesAnalyzed: OrderLineInventoryAnalyzed[]
    customerName: string
    orderNumber: number
    customerEmail: string
}

const VERBOSE = true

export class MailingService {
    private readonly FROM = `${MAIL_FROM_NAME} <${MAILGUN_FROM_USER}@${MAILGUN_DOMAIN}>`
    private commonMailOptions = {
        from: this.FROM,
        replyTo: MAIL_REPLY_TO,
    }

    constructor(private mailer = new Mailgun()) {}

    async sendSingleItemPreorderMail(
        email: string,
        {
            customerName,
            productTitle,
            orderId,
            estimatedShippingDate = 'yet to be determined',
        }: PreorderMailItem
    ) {
        // Adjusting for better email readability.
        // "Delčia: Lemon Cotton Sweater" -> "Delčia Lemon Cotton Sweater"
        productTitle = productTitle.replaceAll(':', '')

        const { body } = render(PreOrderEmailTemplate, {
            props: { customerName, productTitle, orderId, estimatedShippingDate },
        })

        return await this.mailer.sendMail({
            ...this.commonMailOptions,
            html: body,
            to: [email],
            subject: 'Thank you for your pre-order – here’s your shipping update',
            tag: 'preorder',
        })
    }

    async sendSingleCustomizedOrderMail(
        email: string,
        {
            customerName,
            orderId,
        }: {
            customerName: string
            orderId: string
        }
    ) {
        const { body } = render(CustomizedOrderEmailTemplate, {
            props: { customerName, orderId },
        })

        return await this.mailer.sendMail({
            ...this.commonMailOptions,
            html: body,
            to: [email],
            subject: 'Thank you for your order: what you need to know about customization',
            tag: 'customization',
        })
    }

    async sendSingleHandmadeOrderMail(
        email: string,
        {
            customerName,
            orderId,
        }: {
            customerName: string
            orderId: string
        }
    ) {
        const { body } = render(HandmadeOrderEmailTemplate, {
            props: { customerName, orderId },
        })

        return await this.mailer.sendMail({
            ...this.commonMailOptions,
            html: body,
            to: [email],
            subject: 'Thank you for your order - here’s your handmade item update',
            tag: 'handmade',
        })
    }

    async sendHandmadeOrderMail(
        email: string,
        {
            customerName,
            orderId,
        }: {
            customerName: string
            orderId: string
        }
    ) {
        const { body } = render(HandmadeOrderEmailTemplate, { props: { customerName, orderId } })

        return await this.mailer.sendMail({
            ...this.commonMailOptions,
            html: body,
            to: [email],
            subject: 'Thank you for your hand-made order – here’s your shipping update',
            tag: 'handmade-order',
        })
    }

    /**
     *  Processing single notification group:
     *  - pre-order,
     *  - handmade,
     *  - customized
     *
     *  It will send mails for each item in the group.
     *  */
    processNotificationGroup(
        options: NotificationGroupOptions
    ): Promise<NotificationProcessStatus>[] {
        switch (options.notificationGroupRequirement.group) {
            case NotificationType.preorder:
                return this.sendPreorderNotifications(options)
            case NotificationType.customization:
                return [this.sendCustomizationNotifications(options)]
            case NotificationType.handmade:
                return this.sendHandmadeNotifications(options)
        }

        return []
    }

    /**
     * Will send pre-order emails for each unique pre-order item
     * */
    private sendPreorderNotifications({
        notificationGroupRequirement,
        orderLineInventoriesAnalyzed,
        customerName,
        orderNumber,
        customerEmail,
    }: NotificationGroupOptions): Promise<NotificationProcessStatus>[] {
        if (notificationGroupRequirement.group !== NotificationType.preorder)
            throw new Error('Invalid notification type for invoked requirement')

        if (!notificationGroupRequirement.items?.length) return []

        if (VERBOSE)
            console.log(
                `<${orderNumber}> Will send ${notificationGroupRequirement.items.length} preorder emails for products: ${notificationGroupRequirement.items.map((e) => e.title).join(', ')}`
            )

        return notificationGroupRequirement.items.map(async ({ title }) => {
            const matchingItem = orderLineInventoriesAnalyzed.find(
                ({ title: _title }) => _title === title
            )

            return {
                mailingStatus: await this.sendSingleItemPreorderMail(customerEmail, {
                    customerName,
                    productTitle: title,
                    orderId: orderNumber.toString(),
                    estimatedShippingDate: matchingItem?.expectedDate.value,
                }),
                forItem: title,
                group: notificationGroupRequirement.group,
            }
        })
    }

    /**
     * Will send single mail for customized order
     *  */
    private async sendCustomizationNotifications({
        notificationGroupRequirement,
        orderNumber,
        customerEmail,
        customerName,
    }: NotificationGroupOptions): Promise<NotificationProcessStatus> {
        if (notificationGroupRequirement.group !== NotificationType.customization)
            throw new Error('Invalid notification type for invoked requirement')

        if (VERBOSE) console.log(`<${orderNumber}> Will send 1 customized order email`)

        return {
            mailingStatus: await this.sendSingleCustomizedOrderMail(customerEmail, {
                customerName,
                orderId: orderNumber.toString(),
            }),
            group: notificationGroupRequirement.group,
        }
    }

    /**
     * Will send handmade order emails for each unique handmade item
     * */
    private sendHandmadeNotifications({
        notificationGroupRequirement,
        customerEmail,
        customerName,
        orderNumber,
    }: NotificationGroupOptions): Promise<NotificationProcessStatus>[] {
        if (notificationGroupRequirement.group !== NotificationType.handmade)
            throw new Error('Invalid notification type for invoked requirement')

        if (!notificationGroupRequirement.items?.length) return []

        if (VERBOSE)
            console.log(
                `<${orderNumber}> Will send ${notificationGroupRequirement.items.length} preorder emails for products: ${notificationGroupRequirement.items.map((e) => e.title).join(', ')}`
            )

        return notificationGroupRequirement.items.map(async ({ title }) => {
            return {
                mailingStatus: await this.sendSingleHandmadeOrderMail(customerEmail, {
                    customerName,
                    orderId: orderNumber.toString(),
                }),
                forItem: title,
                group: notificationGroupRequirement.group,
            }
        })

        return []
    }
}
