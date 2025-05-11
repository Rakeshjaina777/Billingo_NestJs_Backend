async create(input: CreateInvoiceInput, user: any) {
  const shop = await this.shopRepository.findOneOrFail({
    where: { id: user.shop.id },
  });

  const invoiceItems: InvoiceItem[] = [];

  for (const entry of input.items) {
    const item = await this.itemRepository.findOneOrFail({ where: { id: entry.itemId } });

    if (item.quantity < entry.quantity) {
      throw new BadRequestException(`Not enough stock for item: ${item.name}`);
    }

    // Reduce inventory
    item.quantity -= entry.quantity;
    await this.itemRepository.save(item);

    const invoiceItem = this.invoiceItemRepository.create({
      item,
      quantity: entry.quantity,
      price: entry.price,
      discount: entry.discount,
    });

    invoiceItems.push(invoiceItem);
  }

  const invoice = this.invoiceRepository.create({
    ...input,
    items: invoiceItems,
    shop,
    createdBy: { id: user.userId },
  });

  const savedInvoice = await this.invoiceRepository.save(invoice);

  // Notify (RabbitMQ) or generate PDF (next)
  this.rabbitMQService.publishInvoiceCreated(savedInvoice.id);

  return savedInvoice;
}
