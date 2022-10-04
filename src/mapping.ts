import { TransferCall, ReserveCall } from "../generated/OG/OG";
import { OG } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleReserve(call: ReserveCall): void {
  let og = new OG(call.inputs._name.toHex());
  og.owner = call.transaction.from.toHex();
  og.save();
}

export function handleTransfer(call: TransferCall): void {
  let id = call.inputs._name.toHex();
  let og = OG.load(id);
  if (og == null) {
    log.error("invalid transfer of name %s", [id]);
  } else {
    og.owner = call.inputs._to.toHex();
    og.save();
  }
}
