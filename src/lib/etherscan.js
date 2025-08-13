import axios from "axios";

export async function fetchEthereumTransactions({ address, page = 1, pageSize = 25, apiKey }) {
  try {
    const url = "https://api.etherscan.io/api";
    const params = {
      module: "account",
      action: "txlist",
      address,
      startblock: 0,
      endblock: 99999999,
      page,
      offset: pageSize,
      sort: "desc",
      apikey: apiKey,
    };

    const { data } = await axios.get(url, {
      params,
      timeout: 15000,
      headers: { "User-Agent": "wallet-tracker-fa/1.0" }
    });

    if (!data || data.status !== "1" || !Array.isArray(data.result)) {
      if (data?.message === "No transactions found") {
        return { ok: true, result: [] };
      }
      if (data?.result === "Max rate limit reached") {
        return { ok: false, error: "محدودیت نرخ درخواست. لطفاً کمی صبر کنید." };
      }
      return { ok: false, error: data?.result || data?.message || "خطا در دریافت اطلاعات از API" };
    }

    return { ok: true, result: data.result };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      return { ok: false, error: "زمان انتظار درخواست به پایان رسید" };
    }
    return { ok: false, error: error?.message || "خطا در ارتباط با شبکه" };
  }
}
