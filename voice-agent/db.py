import os
import asyncpg

_pool = None


async def get_pool():
    global _pool
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        return None
    if _pool is None:
        _pool = await asyncpg.create_pool(db_url, min_size=1, max_size=5)
    return _pool


async def log_lead_and_booking(
    client_name: str,
    location: str,
    lift_type: str,
    inquiry: str,
    service_type: str,
    scheduled_date: str | None = None,
) -> dict:
    pool = await get_pool()
    if pool is None:
        return {
            "lead_id": "LOCAL-TEST",
            "assigned_staff": "Lead Installation Engineer",
            "assigned_equip": "Standard Inspection Kit",
        }

    async with pool.acquire() as conn:
        async with conn.transaction():
            lead_id = await conn.fetchval(
                """
                INSERT INTO clients_leads (client_name, location, lift_type, inquiry, status)
                VALUES ($1, $2, $3, $4, 'New')
                RETURNING id
                """,
                client_name,
                location,
                lift_type,
                inquiry,
            )

            staff = await conn.fetchrow(
                """
                SELECT id, name FROM inventory_resources
                WHERE category = 'Staff' AND total_qty > used_today AND status = 'Available'
                ORDER BY used_today ASC LIMIT 1
                FOR UPDATE
                """
            )
            equip = await conn.fetchrow(
                """
                SELECT id, name FROM inventory_resources
                WHERE category = 'Equipment' AND total_qty > used_today AND status = 'Available'
                ORDER BY used_today ASC LIMIT 1
                FOR UPDATE
                """
            )

            assigned_staff = staff["name"] if staff else "Lead Dispatch Pool"
            assigned_equip = equip["name"] if equip else "Standard Inspection Kit"

            if scheduled_date:
                await conn.execute(
                    """
                    INSERT INTO bookings (lead_id, service_type, scheduled_date, assigned_staff, assigned_equipment)
                    VALUES ($1, $2, $3::date, $4, $5)
                    """,
                    lead_id,
                    service_type,
                    scheduled_date,
                    assigned_staff,
                    assigned_equip,
                )
                if staff:
                    await conn.execute(
                        "UPDATE inventory_resources SET used_today = used_today + 1, updated_at = NOW() WHERE id = $1",
                        staff["id"],
                    )
                if equip:
                    await conn.execute(
                        "UPDATE inventory_resources SET used_today = used_today + 1, updated_at = NOW() WHERE id = $1",
                        equip["id"],
                    )

            return {
                "lead_id": lead_id,
                "assigned_staff": assigned_staff,
                "assigned_equip": assigned_equip,
            }
