export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const chainId = searchParams.get('chainId') || '1'; // Default to Ethereum
  const page = searchParams.get('page') || '1';
  
  if (!address) {
    return Response.json({ error: 'آدرس کیف پول الزامی است' }, { status: 400 });
  }

  try {
    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'کلید API تنظیم نشده است' }, { status: 500 });
    }

    // استفاده از Etherscan V2 API با chainId
    const url = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=20&sort=desc&apikey=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === '0' && data.message === 'No transactions found') {
      return Response.json({ 
        status: '1', 
        message: 'OK', 
        result: [] 
      });
    }
    
    if (data.status === '0') {
      return Response.json({ error: data.message }, { status: 400 });
    }
    
    return Response.json(data);
  } catch (error) {
    console.error('خطا در دریافت تراکنش‌ها:', error);
    return Response.json({ error: 'خطا در دریافت اطلاعات' }, { status: 500 });
  }
}
