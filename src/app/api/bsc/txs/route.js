import { NextResponse } from "next/server";
import { fetchBscTransactions } from "../../../../lib/bscscan";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "25", 10);

    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json({ message: "آدرس والت معتبر نیست." }, { status: 400 });
    }

    const apiKey = process.env.BSCSCAN_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "کلید API BscScan تنظیم نشده است." },
        { status: 500 }
      );
    }

    const { ok, result, error } = await fetchBscTransactions({
      address, page, pageSize, apiKey
    });

    if (!ok) {
      return NextResponse.json({ message: error || "خطا در دریافت اطلاعات از شبکه BSC" }, { status: 502 });
    }

    const normalized = (result || []).map((tx) => {
      const valueEth = Number(tx.value) / 1e18;
      const gasPriceWei = Number(tx.gasPrice || 0);
      const gasUsed = Number(tx.gasUsed || 0);
      const feeEth = (gasPriceWei * gasUsed) / 1e18;

      return {
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        valueEth,
        timeStamp: Number(tx.timeStamp),
        status: tx.isError === "0" ? "success" : "error",
        gasPriceWei,
        gasUsed,
        feeEth,
        nonce: tx.nonce,
        txIndex: tx.transactionIndex,
        blockNumber: tx.blockNumber
      };
    });

    return NextResponse.json({ result: normalized });
  } catch (e) {
    console.error("BSC API Error:", e);
    return NextResponse.json({ message: "خطای داخلی سرور" }, { status: 500 });
  }
}
