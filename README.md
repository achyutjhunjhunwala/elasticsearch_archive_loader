## Tool to import archives into any Elasticsearch Instance

### This code was written to import a 7.17 archive into a 8.9 Elasticsearch index

## Create Mapping

`Mappings.json` files has multiple indices. We need to create them manually using the Kibana Developer Console.

For Example -

```json lines
PUT /apm-7.14.0-transaction-000001
{
  "aliases": {
    "apm-7.14.0-transaction": {
      "is_write_index": true
    }
  },
  "mappings": {
   .....
   },
  "settings": {
   .....
   }
}
```

## Import Data
Once all the mappings are created. Run the index.js file to import data into elasticsearch.
Index.js expects a file names `data.json` to be present next to `index.js`. The archives generally have files like `data.json.gz`. Please unzip those files first
