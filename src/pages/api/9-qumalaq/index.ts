import {NextApiRequest, NextApiResponse} from 'next';

export default function ping(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    if (req.method === 'GET') {
        // eslint-disable-next-line no-console
        console.log(query);
    }

    res.status(200).end('9-qumalaq-api-response');
}
